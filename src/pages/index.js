import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { handleJSONfiles } from '../../functions/jsonHandler'
import Exemplo from '@/components/Exemplo'

export default function Home({exemplos, exemplos_externos}) {
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
        {exemplos_externos && exemplos_externos.map((exemplos_externos,i) => (
          <Exemplo key={i} href={`/exemplos_externos/${exemplos_externos.fileName}`}>
            {exemplos_externos.nome_exemplo}
          </Exemplo>
        ))}
        <Exemplo href="https://decapcms.org/docs/intro/" >
          Documentação
        </Exemplo>
      </ul>
    </div>
  )
}

export async function getStaticProps(){
  const exemplos = handleJSONfiles("./content/exemplos");
  const exemplos_externos = handleJSONfiles("./content/exemplos_externos");
  return {
    props: { exemplos, exemplos_externos},
  };
}