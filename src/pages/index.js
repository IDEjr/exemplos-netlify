import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({blogs}) {
  console.log(blogs)
  return (
    <div className={styles['container']}>
      <Head><title>Página de demonstração de demonstração</title></Head>
      <h1 className={styles['header']}>Está é um repositório com exemplos do Netlify CMS</h1>
      <p className={styles['subtitle']}>Sinta-se a vontade para adicionar mais exemplos</p>
      <p className={styles['subtitle']}>Abra /admin para ver as opções</p>
      <ul className={styles['blog-list']}>
        {blogs && blogs.map(blog => (
          <Link className={styles["link"]} key={blog.slug} href={`/exemplos/${blog.slug}`}>
            <div className={styles["card"]}>
                <span >{blog.slug}</span>
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
  //adicione aqui da onde quer pegar os arquivos
  // @nome - nome que vai ser chamado na função, ali em cima
  // @caminho - caminho do diretorio, partindo da raiz
  const diretorios = [
    {nome: 'blogs', caminho: 'exemplos'}
  ]

  const raiz = process.env.PWD;
  var props = {}

  diretorios.forEach(diretorio  =>{
    const arquivosEmBlogs = fs.readdirSync(`${raiz}/content/${diretorio.caminho}`)
    if (arquivosEmBlogs.length > 0){
      const itens = arquivosEmBlogs.map(nomeDoArquivo => {
        const arquivo = fs.readFileSync(`${raiz}/content/${diretorio.caminho}/${nomeDoArquivo}`, 'utf-8')
        const conteudo = matter(arquivo)

        return {
          ...conteudo.data,
          slug: nomeDoArquivo.slice(0,nomeDoArquivo.indexOf('.'))
        }
      })

      props[diretorio.nome] = itens;
    }
  })

  return {
    props
  }
}