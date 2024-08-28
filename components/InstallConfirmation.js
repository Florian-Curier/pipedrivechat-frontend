import { useEffect } from 'react';
import styles from '../styles/Confirmation.module.css';
import { useRouter } from 'next/router';
import {useSelector, useDispatch} from 'react-redux'
import {updateUserInStore} from '../reducers/user'
import { Spin } from 'antd';


const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL


function InstallConfirmation() {

const router = useRouter();
const dispatch = useDispatch();

const user = useSelector((state) => state.user.value)

const domain = router.query.domain // a garder pour redirection iframe
const client_id = router.query.client_id // a garder pour redirection iframe
const company_id = router.query.company_id
const user_id = router.query.user_id



let content =<div className={styles.container}><Spin/> </div>

  useEffect(() => {
    if (domain && client_id && company_id && user_id){
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

      router.push('/alerts')
      // router.push(`${domain}/settings/marketplace/app/${client_id}/app-settings`) // REDIRECION VERS L'IFRAME
  }
  , [user_id] )
  




  return (

    <div >
        {content}
    </div>
  );
}

export default InstallConfirmation;


