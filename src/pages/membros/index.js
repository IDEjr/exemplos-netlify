import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../../styles/Membros.module.css'

export default function Membros({ membros }) {
    return (
        <div className={styles['container']}>
            <Head>
              <title>Membros do projetos :) </title>
            </Head>
            <h1>Membros queridos do projetos</h1>
            {membros.map(membro => {
                return(
                    <div className={`${styles['card']}`}>
                        <span>{membro.nome}</span>
                        <img className={styles['img']} src={membro.foto}></img>
                        <span>
                            {membro.ehDiretor && membro.semestre_saida ? 'Ex-Diretor'  : membro.ehDiretor ? 'Diretor' : 'Membro'}
                        </span>
                        <span>Entrou no {membro.semestre_entrada}° semestre</span>
                        <span>{membro.data_entrada}</span>
                    </div>
                )
            })}
        </div>
    )
}

export async function getStaticProps(){
    //adicione aqui da onde quer pegar os arquivos
    // @nome - nome que vai ser chamado na função, ali em cima
    // @caminho - caminho do diretorio, partindo da raiz
    const diretorios = [
      {nome: 'membros', caminho: 'membros_projetos'}
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