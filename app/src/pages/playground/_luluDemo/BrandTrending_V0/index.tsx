import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import { TrendingChart, DataSourceCard, MethodologyCard } from './components';
import { brandTrendingData, dataSourceInfo } from './data/trendingData';
import styles from './styles.module.scss';

const BrandTrending_V0 = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Brand Trending Analytics</h1>
        <p className={styles.subtitle}>
          Athletic Wear Brand Performance in Chinese Market
        </p>
      </header>

      <section className={styles.chartSection}>
        <div className={styles.chartWrapper}>
          <TrendingChart data={brandTrendingData} />
        </div>
      </section>

      <section className={styles.infoSection}>
        <DataSourceCard
          title={dataSourceInfo.title}
          description={dataSourceInfo.description}
          sources={dataSourceInfo.sources}
          metrics={dataSourceInfo.metrics}
          period={dataSourceInfo.period}
        />
      </section>

      <section className={styles.methodologySection}>
        <MethodologyCard />
      </section>

      <section className={styles.insightsSection}>
        <h2 className={styles.sectionTitle}>Key Insights</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <h3 className={styles.insightTitle}>Lululemon Growth</h3>
            <p className={styles.insightText}>
              Lululemon shows strong upward momentum in the Chinese market, 
              with a 48% increase in trending index from January to October 2025, 
              indicating growing brand awareness and consumer interest.
            </p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightTitle}>Market Competition</h3>
            <p className={styles.insightText}>
              While Nike maintains the highest trending index overall, 
              Lululemon is rapidly closing the gap, demonstrating successful 
              market penetration in the premium athleisure segment.
            </p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightTitle}>Emerging Brands</h3>
            <p className={styles.insightText}>
              Alo Yoga shows significant growth potential with a 69% increase, 
              suggesting rising consumer interest in yoga-focused athletic wear 
              brands in the Chinese market.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.noteSection}>
        <div className={styles.note}>
          <h3 className={styles.noteTitle}>About This Data</h3>
          <p className={styles.noteText}>
            This demo uses simulated data to demonstrate how brand trending analytics 
            could be visualized. Real data would be sourced from platforms like Baidu Index, 
            social media analytics, and e-commerce platforms. The trending index combines 
            multiple metrics including search volume, social media mentions, and consumer 
            engagement to provide a comprehensive view of brand performance.
          </p>
        </div>
      </section>
    </div>
  );
};

const BrandTrendingPage_V0: PageProps = {
  title: "Brand Trending V0",
  slug: "brand-trending-v0",
  content: (
    <AppLayout isTesting={true}>
      <BrandTrending_V0 />
    </AppLayout>
  ),
};

export default BrandTrendingPage_V0;

