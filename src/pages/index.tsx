import type { NextPage } from 'next'
import { IconeHome } from '../components/coins/Icons'
import DashBoard from '../components/dashboard/DashBoard'
import Layout from '../components/layout/Layout'

const Home: NextPage = () => {

  return (
    <Layout titulo='Portfolio' cabecalho={IconeHome}>
        <DashBoard />
    </Layout>
  )
}

export default Home
