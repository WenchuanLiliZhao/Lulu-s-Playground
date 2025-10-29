import styles from './StatusBadge.module.scss'

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending'
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

