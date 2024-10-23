import 'swagger-ui-react/swagger-ui.css'
import SwaggerUI from 'swagger-ui-react'


function ReactSwagger({ spec, url }) {
  if (process.env.NODE_ENV === 'development') {
    return <SwaggerUI spec={spec} />
  }
  
  else {
    return <SwaggerUI url={url} />
  }
}

export default ReactSwagger