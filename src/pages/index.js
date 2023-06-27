import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { handleJSONfiles } from '../../functions/jsonHandler'
import Exemplo from '@/components/Exemplo'

export default function Home({exemplos}) {
  console.log(exemplos)
  return (
    <div className={styles['container']}>
      <Head><title>Página de demonstração de demonstração</title></Head>
      <h1 className={styles['header']}>Este é um repositório com exemplos do Netlify CMS</h1>
      <p className={styles['subtitle']}>Sinta-se a vontade para adicionar mais exemplos</p>
      <p className={styles['subtitle']}>Abra /admin para ver as opções</p>
      <ul className={styles['exemplo-list']}>
        {exemplos && exemplos.map((exemplo,i) => (
          <Exemplo key={i} href={`/exemplos/${exemplo.fileName}`}>
            {exemplo.titulo}
          </Exemplo>
        ))}
        <Exemplo href="/membros" >
          Membros do Projetos
        </Exemplo>
        <Exemplo href="https://github.com/leoheisler/netlify_cms_example" >
          Exemplo Leo (Provisório)
        </Exemplo>
        <Exemplo href="https://github.com/DiegoHommer/netlify_example" >
          Exemplo Diego (Provisório)
        </Exemplo>
      </ul>
    </div>
  )
}

export async function getStaticProps(){
  const exemplos = handleJSONfiles("./content/exemplos");
  return {
    props: { exemplos },
  };
}