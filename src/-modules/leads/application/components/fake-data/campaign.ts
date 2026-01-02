export type SelectCampaignData = {
  value: string
  label: string
  id: string
}

export const selectCampaignData: SelectCampaignData[] = [
  {
    value: 'black_friday_2025',
    label: 'Black Friday 2025',
    id: 'black_friday_2025'
  },
  {
    value: 'dad_day_2025',
    label: 'Dia dos Pais 2025',
    id: 'dad_day_2025'
  },
  {
    value: 'valentines_day_2025',
    label: 'Dia dos Namorados 2025',
    id: 'valentines_day_2025'
  },
  {
    value: 'mothers_day_2025',
    label: 'Dia das Mães 2025',
    id: 'mothers_day_2025'
  },
  {
    value: 'fathers_day_2025',
    label: 'Dia dos Pais 2025',
    id: 'fathers_day_2025'
  },
  {
    value: 'new_year_2026',
    label: 'Ano Novo 2026',
    id: 'new_year_2026'
  },
  {
    value: 'easter_2026',
    label: 'Páscoa 2026',
    id: 'easter_2026'
  }
]

export const StatusCampaignData:  SelectCampaignData[] = [
  {
    value: 'answered',
    label: 'Respondido',
    id: 'answered'
  },
  {
    value: 'not_answered',
    label: 'Sem resposta',
    id: 'not_answered'
  },
  {
    value: 'opened_mail',
    label: 'Email aberto',
    id: 'opened_mail'
  },
  {
    value: 'clicked_link',
    label: 'Link clicado',
    id: 'clicked_link'
  },
  {
    value: 'download_file',
    label: 'Arquivo baixado',
    id: 'download_file'
  },
  {
    value: 'awaiting_response',
    label: 'Aguardando',
    id: 'awaiting_response'
  },
  {
    value: 'interested',
    label: 'Interessado',
    id: 'interested'
  }
  
]

export const OrderByData: SelectCampaignData[] = [
  {
    value: 'name',
    label: 'Nome',
    id: 'name'
  },
  {
    value: 'email',
    label: 'Email',
    id: 'email'
  },
  {
    value: 'phone',
    label: 'Telefone',
    id: 'phone'
  },
  {
    value: 'campaign',
    label: 'Campanha',
    id: 'campaign'
  },
  {
    value: 'status',
    label: 'Status',
    id: 'status'
  }
]