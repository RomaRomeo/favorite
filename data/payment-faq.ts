export interface PaymentFaqItem {
  label: string
  icon: string
  content: string
}

export const paymentFaq: PaymentFaqItem[] = [
  {
    label: "Які переваги онлайн-оплати?",
    icon: "material-symbols-light:star-rounded",
    content: "Онлайн-оплата займає лише кілька секунд і не потребує візиту до банку.",
  },
  {
    label: "Що робити, якщо платіж не пройшов?",
    icon: "material-symbols-light:star-rounded",
    content: "Зв'яжіться з нашою підтримкою, і ми допоможемо вирішити проблему.",
  },
]
