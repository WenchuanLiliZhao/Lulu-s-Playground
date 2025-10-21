import styles from './_styles.module.scss';

export interface MethodologyCardProps {
  className?: string;
}

export const MethodologyCard = ({ className = '' }: MethodologyCardProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h3 className={styles.title}>Trending Index Calculation Methodology</h3>
      <p className={styles.intro}>
        The Trending Index is a composite metric (0-100 scale) that measures brand 
        popularity and market interest in the Chinese market. It combines multiple 
        data sources to provide a comprehensive view of brand performance.
      </p>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Data Sources & Weights</h4>
        <div className={styles.formulaList}>
          <div className={styles.formulaItem}>
            <div className={styles.weight}>40%</div>
            <div className={styles.source}>
              <strong>Baidu Index (百度指数)</strong>
              <p>Search volume and trends on Baidu search engine</p>
            </div>
          </div>

          <div className={styles.formulaItem}>
            <div className={styles.weight}>30%</div>
            <div className={styles.source}>
              <strong>Social Media Engagement</strong>
              <p>Mentions, discussions, and sentiment on Weibo, WeChat, and Xiaohongshu (Little Red Book)</p>
            </div>
          </div>

          <div className={styles.formulaItem}>
            <div className={styles.weight}>20%</div>
            <div className={styles.source}>
              <strong>E-commerce Metrics</strong>
              <p>Product views, sales data, and customer reviews on Tmall and JD.com</p>
            </div>
          </div>

          <div className={styles.formulaItem}>
            <div className={styles.weight}>10%</div>
            <div className={styles.source}>
              <strong>Media Coverage</strong>
              <p>Brand mentions in news articles, fashion blogs, and online publications</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Calculation Formula</h4>
        <div className={styles.formula}>
          <code>
            Trending Index = <br/>
            &nbsp;&nbsp;(Baidu Score × 0.4) + <br/>
            &nbsp;&nbsp;(Social Score × 0.3) + <br/>
            &nbsp;&nbsp;(E-commerce Score × 0.2) + <br/>
            &nbsp;&nbsp;(Media Score × 0.1)
          </code>
        </div>
        <p className={styles.formulaNote}>
          Each component score is normalized to a 0-100 scale before weighting.
        </p>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Component Breakdown Example</h4>
        <div className={styles.example}>
          <div className={styles.exampleTitle}>Lululemon (October 2025): Score = 96</div>
          <div className={styles.breakdown}>
            <div className={styles.breakdownItem}>
              <span className={styles.label}>Baidu Search Index:</span>
              <span className={styles.value}>95 × 0.4 = 38.0</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.label}>Social Media Score:</span>
              <span className={styles.value}>98 × 0.3 = 29.4</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.label}>E-commerce Score:</span>
              <span className={styles.value}>96 × 0.2 = 19.2</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.label}>Media Coverage:</span>
              <span className={styles.value}>92 × 0.1 = 9.2</span>
            </div>
            <div className={styles.total}>
              <span className={styles.label}>Total Index:</span>
              <span className={styles.value}>95.8 ≈ 96</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>API Integration Options</h4>
        <div className={styles.apiList}>
          <div className={styles.apiItem}>
            <strong>Baidu Index API</strong>
            <p>Access through <a href="https://index.baidu.com" target="_blank" rel="noopener noreferrer">index.baidu.com</a> - Requires authorization and data access agreement</p>
          </div>
          <div className={styles.apiItem}>
            <strong>Social Media APIs</strong>
            <p>Weibo Open Platform, WeChat Official Account Platform - Rate-limited with authentication required</p>
          </div>
          <div className={styles.apiItem}>
            <strong>E-commerce Data</strong>
            <p>Tmall Open Platform, JD Data API - Typically requires merchant or partner status</p>
          </div>
          <div className={styles.apiItem}>
            <strong>Third-Party Analytics</strong>
            <p>Services like Syntun (生意参谋), QuestMobile, or iResearch provide aggregated market data</p>
          </div>
        </div>
      </div>

      <div className={styles.note}>
        <strong>Note:</strong> The data shown in this demo is simulated for demonstration 
        purposes. Real implementations would require API access to the above platforms 
        and regular data updates to maintain accuracy.
      </div>
    </div>
  );
};

