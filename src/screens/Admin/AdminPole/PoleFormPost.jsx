import axios from 'axios'
import { useState } from 'react'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'

import FormTiny from '../../../components/Form/FormTiny'
import FormTinyFunc from '../../../components/Form/FormTinyFunc'

const PoleFormPost = ({ getPoles, closeForm }) => {
  const [poleInfo, setPoleInfo] = useState({
    pole_name: '',
    pole_title: '',
    pole_picto: '',
    pole_desc: '',
    pole_banner: '',
    pole_func: '',
    pole_func_img: '',
    pole_num: '',
    pole_email: '',
    pole_miniature_img: '',
    pole_catchphrase: ''
  })

  const [poleImage, setPoleImage] = useState()
  const [poleFunc, setPoleFunc] = useState()
  const [poleMiniature, setPoleMiniature] = useState()
  const [addAlert, setAddAlert] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [confirmTiny, setConfirmTiny] = useState(false)
  const [confirmTiny1, setConfirmTiny1] = useState(false)

  const handlePoleChange = event => {
    setPoleInfo({ ...poleInfo, [event.target.name]: event.target.value })
  }

  const submitPoleData = async event => {
    event.preventDefault()
    const newPost = { ...poleInfo }
    if (poleImage && poleFunc && poleMiniature) {
      const fd = new FormData()
      const filename1 = Date.now() + poleImage.name
      fd.append('pole_banner', poleImage, filename1)
      newPost.pole_banner = filename1
      const filename2 = Date.now() + poleFunc.name
      fd.append('pole_func_img', poleFunc, filename2)
      newPost.pole_func_img = filename2
      const filename3 = Date.now() + poleMiniature.name
      fd.append('pole_miniature_img', poleMiniature, filename3)
      newPost.pole_miniature_img = filename3
      try {
        await axios.post(`${process.env.REACT_APP_URL_API}/upload`, fd)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const results = await axios.post(
        `${process.env.REACT_APP_URL_API}/poles`,
        newPost
      )
      console.log(results)
      setRefresh(!refresh)
      setTimeout(closeForm, 2500)
    } catch (err) {
      console.log(err)
    }
    getPoles()
    setAddAlert(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  // setData pertmet de transmettre l'info stockée ds tiny
  const setData = text => {
    setPoleInfo({ ...poleInfo, pole_desc: text })
  }
  const setDataFunc = text => {
    setPoleInfo({ ...poleInfo, pole_func: text })
  }

  const handleEditorChange = () => {
    setConfirmTiny(false)
    setConfirmTiny1(false)
  }
  const handleEditorChange1 = () => {
    setConfirmTiny1(false)
  }

  return (
    <div className='form flex col jcc aic'>
      <div className='closeBtn flex jcc aic' onClick={closeForm}>
        x
      </div>
      <div className='bottomDivTitle'>Nouveau pôle</div>
      <div className='FormContainer'>
        <form encType='multipart/form-data' className='formItems'>
          <label>Nom de l&apos;onglet</label>
          <input
            name='pole_name'
            onChange={handlePoleChange}
            placeholder={`Nom de l'onglet`}
          />
          <label>Bannière</label>
          <input
            type='file'
            name='pole_banner'
            key='pole_banner'
            placeholder={`Bannière`}
            onChange={e => {
              setPoleImage(e.target.files[0])
            }}
          />
          <label>Titre de page pôle</label>
          <input
            name='pole_title'
            onChange={handlePoleChange}
            placeholder={`Titre de page pôle`}
          />
          <label>Pôle picto</label>
          <input
            name='pole_picto'
            onChange={handlePoleChange}
            placeholder={`Pôle picto`}
          />
        </form>
        <div className='tiny'>
          <label>Pôle description</label>
          <FormTiny
            setData={setData}
            confirmTiny={confirmTiny}
            setConfirmTiny={setConfirmTiny}
            handleEditorChange={handleEditorChange}
          />
        </div>
        <form encType='multipart/form-data' className='formItems'>
          <label>Photo de Fonctionnement</label>
          <input
            type='file'
            name='pole_func_img'
            key='pole_func_img'
            onChange={e => {
              setPoleFunc(e.target.files[0])
            }}
            placeholder={`Photo de Fonctionnement`}
          />
        </form>

        <div className='tiny'>
          <label>Pôle Fonctionnement</label>
          <FormTinyFunc
            setDataFunc={setDataFunc}
            confirmTiny1={confirmTiny1}
            setConfirmTiny1={setConfirmTiny1}
            handleEditorChange={handleEditorChange}
          />
        </div>
        <form encType='multipart/form-data' className='formItems'>
          <label>Numéro de téléphone</label>
          <input
            name='pole_num'
            onChange={handlePoleChange}
            placeholder={`Numéro de téléphone`}
          />
          <label>E-mail</label>
          <input
            name='pole_email'
            onChange={handlePoleChange}
            placeholder={`e-mail`}
          />
          <label>Vignette</label>
          <input
            type='file'
            name='pole_miniature_img'
            key='pole_miniature_img'
            onChange={e => {
              setPoleMiniature(e.target.files[0])
            }}
            placeholder={`Vignette`}
          />
          <label>Sous-titre</label>
          <input
            name='pole_catchphrase'
            onChange={handlePoleChange}
            placeholder={`Sous-titre`}
          />
        </form>
        <button className='btnForm' onClick={submitPoleData}>
          Publier
        </button>
        <Snackbar
          open={addAlert}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Alert severity='success'>Pôle ajouté avec succès</Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default PoleFormPost
