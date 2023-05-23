import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { handleJSONfiles } from '../../functions/jsonHandler'

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
          <Link className={styles["link"]} key={i} href={`/exemplos/${exemplo.fileName}`}>
            <div className={styles["card"]}>
                <span >{exemplo.titulo}</span>
            </div>
          </Link>
        ))}
        <Link className={styles["link"]} href={`/membros`}>
            <div className={styles["card"]}>
                <span >Membros do Projetos</span>
            </div>
          </Link>
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