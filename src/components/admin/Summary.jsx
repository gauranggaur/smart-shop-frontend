import React from 'react'
import { faUsers, faChartBar, faClipboard } from 'react-icons'

const Summary = () => {

  const data = [
    {
      icon: <faUsers />,
      digits: 50,
      isMoney: false,
      title: 'Users',
      color: 'rgb(102, 108, 255)',
      bgColor: 'rgba(102, 108, 255, 0.12)',
      percentage: 30
    },
    {
      icon: <faClipboard />,
      digits: 70,
      isMoney: false,
      title: 'Orders',
      color: 'rgb(38, 198, 249)',
      bgColor: 'rgba(38, 198, 249, 0.12)',
      percentage: 20
    },
    {
      icon: <faChartBar />,
      digits: 500,
      isMoney: false,
      title: 'Earnings',
      color: 'rgb(253, 181, 40)',
      bgColor: 'rgba(253, 181, 40, 0.12)',
      percentage: 60
    },
  ]


  return (
    <div style={{width: '100%', display: 'flex'}}>
        <div style={{width: '100%', flex: 2}}>

        </div>
        <div className='sideStats'>

        </div>
    </div>
  )
}

export default Summary