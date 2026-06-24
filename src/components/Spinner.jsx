import React from 'react'
import { useTranslation } from 'react-i18next';

const Spinner = () => {
  const { t } = useTranslation();

  return (
    <div role="status" className="flex justify-center items-center flex-col gap-3">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      <span className="text-light text-xl font-medium">{t('loading')}</span>
    </div>
  )
}

export default Spinner