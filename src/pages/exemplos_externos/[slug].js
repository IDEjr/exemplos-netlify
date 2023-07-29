import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../../styles/Examples.module.css'
import { handleJSONfile } from '../../../functions/jsonHandler'
import Link from 'next/link'

export default function Blog({ content }) {
    return (
        <div className={styles['container']}>
          <Head>
              <title>Página de exemplo externo | {content.nome_exemplo}</title>
          </Head>
          <div className={styles['examples-container']}>
            <h1>{content.nome_exemplo}</h1>
            <div className={styles['markdown']}>
              <ReactMarkdown>
                  {content.descricao_exemplo}
              </ReactMarkdown>
            </div>
            <Link href={content.link_exemplo}>
              Link do exemplo
            </Link>
            <div>Exemplo feito por: {content.autor_exemplo}</div>
          </div>
        </div>
    )
}

export async function getStaticProps({params : {slug} }){
  const caminho = "exemplos_externos";

  const content = handleJSONfile(`./content/${caminho}/${slug}.json`);
  return {
    props: { content },
  };
}

export async function getStaticPaths() {
  const raiz = process.env.PWD || process.env.INIT_CWD;
  const caminho = "exemplos_externos";

  const filesInProjects = fs.readdirSync(raiz + `/content/${caminho}`)

  const paths = filesInProjects.map(file => {
    const filename = file.slice(0, file.indexOf('.'))
    return { params: { slug: filename }}
  })

  return {
    paths,
    fallback: false 
  }
}