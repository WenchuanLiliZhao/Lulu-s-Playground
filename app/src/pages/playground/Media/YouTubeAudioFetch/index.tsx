import { useState, useEffect, useRef, useCallback } from 'react';
import AppLayout from "../../../../components/ui/AppLayout";
import Button from "../../../../components/ui/Button";
import type { PageProps } from "../../../_page-types";
import styles from './styles.module.scss';

// YouTube IFrame API types
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement, config: unknown) => YouTubePlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeAudioFetch = () => {
  const [videoId, setVideoId] = useState('dCJ9EQJ5grc');
  const [startTime, setStartTime] = useState(20); // 0:20 in seconds
  const [endTime, setEndTime] = useState(300); // 5:00 in seconds
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState('Loading YouTube API...');
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Format time in MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start tracking current time
  const startTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      if (player) {
        const current = player.getCurrentTime();
        setCurrentTime(current);
        
        // Stop playback if we've reached the end time
        if (current >= endTime) {
          player.pauseVideo();
          setStatus(`Reached end time (${formatTime(endTime)})`);
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }
    }, 100);
  }, [player, endTime]);

  // Stop tracking current time
  const stopTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initialize player (audio only - video hidden)
  const initPlayer = useCallback(() => {
    if (window.YT && window.YT.Player && playerRef.current) {
      new window.YT.Player(playerRef.current, {
        height: '1',  // Minimal size - hidden
        width: '1',   // Minimal size - hidden
        videoId: videoId,
        playerVars: {
          start: startTime,
          autoplay: 1, // Auto-start playing
          controls: 0, // Hide controls since we have custom ones
          mute: 1,     // Start muted to allow autoplay, will unmute immediately
        },
        events: {
          onReady: (event: YouTubeEvent) => {
            setPlayer(event.target);
            setIsPlayerReady(true);
            const duration = event.target.getDuration();
            setVideoDuration(duration);
            
            // Adjust end time if it exceeds video duration
            const adjustedEndTime = endTime > duration ? Math.floor(duration) : endTime;
            if (endTime > duration) {
              setEndTime(adjustedEndTime);
            }
            
            setStatus(`🎵 Starting audio playback...`);
            
            // Start playing muted, then unmute after playback starts
            setTimeout(() => {
              event.target.seekTo(startTime, true);
              event.target.playVideo();
            }, 100);
          },
          onStateChange: (event: YouTubeEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              // Unmute as soon as playback starts
              if (event.target.isMuted()) {
                event.target.unMute();
                setStatus(`🎵 Audio playing (unmuted and started automatically)...`);
              } else {
                setStatus(`🎵 Audio playing...`);
              }
              startTimeTracking();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              stopTimeTracking();
              setStatus(`⏸️ Audio paused`);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              stopTimeTracking();
              setStatus(`✅ Audio segment completed`);
            } else {
              stopTimeTracking();
            }
          },
        },
      });
    }
  }, [videoId, startTime, endTime, startTimeTracking, stopTimeTracking]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        setStatus('YouTube API loaded, initializing player...');
        // Auto-initialize player when API is ready
        setTimeout(() => {
          initPlayer();
        }, 100);
      };
    } else {
      // API already loaded, initialize immediately
      setStatus('Initializing player...');
      setTimeout(() => {
        initPlayer();
      }, 100);
    }
  }, [initPlayer]);

  // Parse time string (MM:SS or M:SS) to seconds
  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 0;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimeTracking();
      if (player) {
        player.destroy();
      }
    };
  }, [player, stopTimeTracking]);

  // Play segment
  const playSegment = () => {
    if (player) {
      player.seekTo(startTime, true);
      player.playVideo();
      setStatus(`Playing from ${formatTime(startTime)} to ${formatTime(endTime)}`);
    } else {
      setStatus('Please load the video first');
    }
  };

  // Stop playback
  const stopPlayback = () => {
    if (player) {
      player.pauseVideo();
      stopTimeTracking();
      setStatus('Playback stopped');
    }
  };

  // Fetch audio segment (demonstration)
  const fetchAudioSegment = async () => {
    const adjustedEndTime = videoDuration && endTime > videoDuration 
      ? Math.floor(videoDuration) 
      : endTime;
    
    setStatus(`🎵 Fetching audio-only segment: ${formatTime(startTime)} - ${formatTime(adjustedEndTime)}...`);
    
    // In a real implementation, this would call a backend API
    // Example API call structure:
    const apiUrl = `/api/youtube-audio?videoId=${videoId}&start=${startTime}&end=${adjustedEndTime}&format=mp3`;
    
    // Simulate API call
    setTimeout(() => {
      setStatus(`✅ Audio-only extraction ready!
      
📦 Segment Info:
   • Video ID: ${videoId}
   • Time Range: ${formatTime(startTime)} - ${formatTime(adjustedEndTime)}
   • Duration: ${formatTime(adjustedEndTime - startTime)}
   • Format: MP3 (audio only, no video data)
   
🔧 Backend API Endpoint (example):
   ${apiUrl}
   
💡 Implementation: Use yt-dlp with --extract-audio flag to download audio only without video stream.`);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎵 YouTube Audio-Only Fetcher</h1>
        <p className={styles.subtitle}>
          Extract audio (no video) from specific time ranges of YouTube videos
        </p>
        <div className={styles.badge}>Audio Only Mode</div>
      </header>

      <div className={styles.content}>
        {/* Video Input Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Video Configuration</h2>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              YouTube Video URL or ID:
              <input
                type="text"
                className={styles.input}
                value={videoId}
                onChange={(e) => {
                  const value = e.target.value;
                  // Extract video ID from URL if needed
                  const match = value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                  setVideoId(match ? match[1] : value);
                }}
                placeholder="dCJ9EQJ5grc"
              />
            </label>
          </div>

          <div className={styles.timeInputs}>
            <label className={styles.label}>
              Start Time (MM:SS):
              <input
                type="text"
                className={styles.input}
                value={formatTime(startTime)}
                onChange={(e) => setStartTime(parseTime(e.target.value))}
                placeholder="0:20"
              />
            </label>

            <label className={styles.label}>
              End Time (MM:SS):
              <input
                type="text"
                className={styles.input}
                value={formatTime(endTime)}
                onChange={(e) => setEndTime(parseTime(e.target.value))}
                placeholder="5:00"
              />
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <Button onClick={initPlayer}>🎵 Load & Auto-Play Audio</Button>
            <Button onClick={playSegment} disabled={!player}>▶️ Replay Segment</Button>
            <Button onClick={stopPlayback} disabled={!player}>⏸️ Pause</Button>
            <Button onClick={fetchAudioSegment} disabled={!player}>⬇️ Download Audio Only</Button>
          </div>
          
          <div className={styles.infoNote}>
            🎵 <strong>Audio-Only Mode:</strong> Only audio is loaded and played - no video displayed. The video stream is not loaded to save bandwidth.
            <br/>
            <small>✨ Audio will auto-play on page load (starts muted briefly, then unmutes automatically to bypass browser restrictions).</small>
          </div>
        </section>

        {/* Audio Player Section - Hidden Video Element */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎵 Audio Player</h2>
          <div className={styles.audioModeNote}>
            🎧 Playing audio only - video is hidden to save bandwidth and focus on audio content.
          </div>
          
          {/* Hidden player - only for audio playback */}
          <div className={styles.hiddenPlayer}>
            <div ref={playerRef}></div>
          </div>
          
          {/* Custom Audio Visualization */}
          <div className={styles.audioVisualizer}>
            <div className={styles.audioIcon}>🎵</div>
            <div className={styles.audioInfo}>
              <div className={styles.nowPlaying}>
                {isPlayerReady ? 'Now Playing: Audio from YouTube Video' : 'Loading audio player...'}
              </div>
              <div className={styles.videoId}>Video ID: {videoId}</div>
              {isPlayerReady && (
                <div className={styles.quickPlay}>
                  <Button onClick={() => player?.playVideo()}>
                    ▶️ Play
                  </Button>
                  <Button onClick={() => player?.pauseVideo()}>
                    ⏸️ Pause
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {videoDuration && (
            <div className={styles.info}>
              <p><strong>Video Duration:</strong> {formatTime(videoDuration)}</p>
              <p><strong>Current Time:</strong> {formatTime(currentTime)}</p>
              <p><strong>Segment Duration:</strong> {formatTime(endTime - startTime)}</p>
              {endTime > videoDuration && (
                <p className={styles.warning}>
                  ⚠️ End time ({formatTime(endTime)}) exceeds video duration. 
                  It will be adjusted to {formatTime(Math.floor(videoDuration))}.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Status Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Status</h2>
          <div className={styles.statusBox}>
            <p>{status}</p>
          </div>
        </section>

        {/* Info Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Implementation Notes</h2>
          <div className={styles.infoBox}>
            <h3>🎵 Audio-Only Mode (Current Implementation):</h3>
            <ul>
              <li>Plays <strong>audio track only</strong> - video player is hidden (1x1 pixel)</li>
              <li>No video rendering - saves bandwidth and processing power</li>
              <li>Automatically adjusts end time if it exceeds video duration</li>
              <li>Auto-plays the segment on load for immediate audio playback</li>
              <li>Stops playback automatically at the specified end time</li>
            </ul>
            
            <h3>Backend Implementation (Audio-Only):</h3>
            <ul>
              <li><strong>yt-dlp with audio extraction:</strong>
                <br/><code>yt-dlp -x --audio-format mp3 --audio-quality 0 --postprocessor-args &quot;-ss 00:00:20 -to 00:05:00&quot; [VIDEO_URL]</code>
              </li>
              <li><strong>--extract-audio (-x):</strong> Downloads audio only, skips video stream entirely</li>
              <li><strong>--audio-format mp3:</strong> Converts to MP3 format</li>
              <li><strong>ffmpeg time trimming:</strong> Extracts only the specified segment</li>
              <li>Output: Small audio file (vs. large video file with audio)</li>
            </ul>

            <h3>Backend API Example:</h3>
            <ul>
              <li>Node.js/Express with <code>yt-dlp</code> subprocess</li>
              <li>Python Flask/FastAPI with <code>yt-dlp</code> library</li>
              <li>Returns audio file stream (MP3/M4A/WAV)</li>
              <li>Significantly smaller file size - audio only!</li>
            </ul>

            <h3>Why Audio-Only Matters:</h3>
            <ul>
              <li>📦 <strong>Much smaller file size</strong> (5-10MB vs 50-100MB for video)</li>
              <li>⚡ <strong>Faster download</strong> - only audio stream fetched</li>
              <li>💾 <strong>Less bandwidth</strong> - perfect for music/podcasts</li>
              <li>🎧 <strong>Direct to audio players</strong> - ready for listening</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

const YouTubeAudioFetchPage: PageProps = {
  title: "YouTube Audio Fetch Demo",
  slug: "youtube-audio-fetch",
  content: (
    <AppLayout isTesting={true}>
      <YouTubeAudioFetch />
    </AppLayout>
  ),
};

export default YouTubeAudioFetchPage;

