import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../../styles/Examples.module.css'

export default function Blog({ frontmatter, markdown}) {
  console.log(frontmatter.selecao)
    return (
        <div className={styles['container']}>
          <Head>
              <title>Página de demonstração | {frontmatter.title}</title>
          </Head>
          <div className={styles['examples-container']}>
            <h1>{frontmatter.titulo}</h1>
            {frontmatter.bool ? <div>true</div> : <div>false</div>}
            <div>{frontmatter.data}</div>
            <div style={{backgroundColor: frontmatter.cor, color: 'white'}}>exemplo de cor</div>
            <img className={styles['img']} src={`${frontmatter.imagem}`}></img>
            <a href={`${frontmatter.arquivos}`} download>{frontmatter.arquivos}</a>
            <div>{frontmatter.localizacao}</div>
            <div>{frontmatter.numeros}</div>
            {frontmatter.selecao.map(conteudo =>{
              return (<div>{conteudo}</div>)
            })}
            <div>{frontmatter.texto}</div>
            <div className={styles['markdown']}>
              <ReactMarkdown>
                  {frontmatter.conteudo}
              </ReactMarkdown>
            </div>
          </div>
        </div>
    )
}

export async function getStaticProps({ params: { slug } }) {
    const raiz = process.env.PWD;
    const caminho = "exemplos";

    const fileContent = matter(fs.readFileSync(`${raiz}/content/${caminho}/${slug}.md`, 'utf8'))
    let frontmatter = fileContent.data
    const markdown = fileContent.content 
    return {
      props: { frontmatter, markdown }
    }
  }
  
  export async function getStaticPaths() {
    const raiz = process.env.PWD;
    const caminho = "exemplos";

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