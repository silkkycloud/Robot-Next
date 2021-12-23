import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

class PipedDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-white dark:bg-neutral-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default PipedDocument
