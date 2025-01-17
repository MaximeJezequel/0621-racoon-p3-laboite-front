import { useState, useEffect } from 'react'
import axios from 'axios'

import BottomCenter from '../../components/BottomCenter/BottomCenter'
import CreamBox from '../../components/CreamBox/CreamBox'
import GreenBox from '../../components/GreenBox/GreenBox'
import GreenBoxText from '../../components/GreenBox/GreenBoxText'
import PartnerList from '../../components/PartnerList/PartnerList'
import RibbonTitle from '../../components/RibbonTitle/RibbonTitle'

import './Partners.css'

const Partners = () => {
  const [partnership, setPartnership] = useState([])
  const [partners, setPartners] = useState([])

  useEffect(() => {
    const getPartnership = () => {
      axios
        .get(`${process.env.REACT_APP_URL_API}/partnership`)
        .then(res => setPartnership(res.data[0]))
    }
    getPartnership()
  }, [])

  useEffect(() => {
    const getPartners = () => {
      axios
        .get(`${process.env.REACT_APP_URL_API}/partners`)
        .then(res => setPartners(res.data))
    }
    getPartners()
  }, [])

  let topPic = []
  let midPic = []
  let botPic = []
  let topText = []
  let midText = []
  let botText = []
  for (let i = 1; i <= 5; i++) {
    partnership[`partnership_top_pic` + i] &&
      topPic.push(partnership[`partnership_top_pic` + i])
    partnership[`partnership_mid_pic` + i] &&
      midPic.push(partnership[`partnership_mid_pic` + i])
    partnership[`partnership_bot_pic` + i] &&
      botPic.push(partnership[`partnership_bot_pic` + i])
    partnership[`partnership_top_txt` + i] &&
      topText.push(partnership[`partnership_top_txt` + i])
    partnership[`partnership_mid_txt` + i] &&
      midText.push(partnership[`partnership_mid_txt` + i])
    partnership[`partnership_bot_txt` + i] &&
      botText.push(partnership[`partnership_bot_txt` + i])
  }

  return (
    <div className='centerContainer'>
      <div className='mainContainer width100'>
        <RibbonTitle
          title={partnership.partnership_banner_title}
          picto={partnership.partnership_banner_picto}
        />
        <CreamBox
          creamTitle={partnership.partnership_top_title}
          creamPic={topPic}
          creamText={topText}
        />
        <GreenBox
          greenTitle={partnership.partnership_mid_title}
          greenPic={midPic}
          greenText={midText}
        />
        <div className='partners'>
          <p className='cream paragraph'>
            LA BOÎTE D’À CÔTÉ a pu voir le jour grâce à l’engagement de nombreux
            bénévoles et de partenaires locaux avec lesquels elle garde des
            relations privilégiées:
          </p>
          {partners.map(e => (
            <li key={e.partner_id} className='cream paragraph'>
              {e.partner_name}
            </li>
          ))}
          <PartnerList partners={partners} />
        </div>
        <GreenBoxText
          greenTitle={partnership.partnership_bot_title}
          greenPic={botPic}
          greenText={botText}
        />
        <div className='thanks'>Merci, à bientôt !</div>
        <BottomCenter />
      </div>
    </div>
  )
}

export default Partners
