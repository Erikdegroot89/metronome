import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Metronome from "../components/metronome/metronome"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 className='mb-4 text-4xl mb-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
       Musician Toolbox
      </h1>
      <div className="w-3/4 content-center">
        <Metronome />
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
