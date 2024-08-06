import { useEffect } from 'react';
import styles from '../styles/Confirmation.module.css';
import { useRouter } from 'next/router';
import {useSelector, useDispatch} from 'react-redux'
import {updateUserInStore} from '../reducers/user'


const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL


function InstallConfirmation() {

const router = useRouter();
const dispatch = useDispatch();

const user = useSelector((state) => state.user.value)

const domain = router.query.domain
const client_id = router.query.client_id
const company_id = router.query.company_id
const user_id = router.query.user_id


console.log(user)
useEffect(() => {
  const fetchUser = async () => {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/${company_id}/${user_id}`)
    const data =  await response.json()

    
    dispatch(updateUserInStore(
      { user_name : data.user?.user_name,
        pipedrive_user_id : data.user?.pipedrive_user_id,
        pipedrive_company_id: data.user?.pipedrive_company_id,
        api_domain: data.user?.api_domain,
        google_email : data.user?.google_email
      }))
  }
  fetchUser()

}
, [router] )



const handleClick = () => {
    router.push('/') // REDIRECTION VERS HOME
    // router.push(`${domain}/settings/marketplace/app/${client_id}/app-settings`) // REDIRECION VERS L'IFRAME
}




  return (

    <div className={styles.container}>
        <h1 className={styles.title}> Congratulations {user?.user_name} !</h1>
        <span>Installation Complete wiht your google accout {user.google_email} </span>
        <span>You can now configure your alerts</span>
        <button onClick={ () => handleClick()}>Back to Pipedrive</button>
    </div>
  );
}

export default InstallConfirmation;