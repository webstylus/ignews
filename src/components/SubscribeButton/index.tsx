import styles from './styles.module.scss'

interface ISubscribeButtonProps {
  priceId: string
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  return (
    <button type={'button'} className={styles.subScribeButton}>
      Subscribe Now
    </button>
  )
}
