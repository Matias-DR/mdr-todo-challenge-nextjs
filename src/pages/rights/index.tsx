import { AComponent } from '@/components'
import { useState } from 'react'


const languages = {
  en: <>
    MIT License
    <br />
    <br />
    Copyright (c) 2024 Matias Diz Rendani
    <br />
    <br />
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    <br />
    <br />
    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  </>,
  es: <>
    Licencia MIT
    <br />
    <br />
    Copyright (c) 2024 Matias Diz Rendani
    <br />
    <br />
    Por la presente se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el &quot;Software&quot;), para comerciar con el Software sin restricciones, incluyendo sin limitación los derechos de uso, copia, modificación, fusión, publicación, distribución, sublicencia y/o venta de copias del Software, y para permitir a las personas a las que se proporcione el Software que lo hagan, sujeto a las siguientes condiciones: El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.
    <br />
    <br />
    EL SOFTWARE SE SUMINISTRA &quot;TAL CUAL&quot;, SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUIDAS, ENTRE OTRAS, LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN DETERMINADO Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O LOS TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN CONTRACTUAL, EXTRACONTRACTUAL O DE OTRO TIPO, QUE SURJA DE, O ESTÉ RELACIONADA CON EL SOFTWARE O EL USO U OTRAS OPERACIONES CON EL SOFTWARE.
  </>
}

export default function LicensePage() {
  const [languaje, setLanguaje] = useState(languages.es)

  const handleChange = (e: any) => {
    setLanguaje(languages[e.target.value as 'en' | 'es'])
  }

  return <main className='flex flex-col justify-center items-center'>
    <AComponent
      href='/sign/in'
      className='my-6'
    >
      Volver
    </AComponent>
    <div className='relative'>
      <select
        className={
          `appearance-none bg-zinc-900 text-zinc-300 py-3 px-4 
          pr-8 focus:outline-none dark:bg-zinc-900 dark:focus:bg-zinc-900
        `}
        id='grid-state'
        onChange={handleChange}
      >
        <option
          value='es'
        >
          Español
        </option>
        <option
          value='en'
        >
          English
        </option>
      </select>
      <div className={`
        pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 
        text-zinc-300
      `}>
        <svg
          className='fill-current h-4 w-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'>
          <path d={`
            M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z
          `} />
        </svg>
      </div>
    </div>

    <div className={`
      w-80 h-1 flex-grow flex items-center justify-center scrollbar-y-zinc
    `}>
      <p className='max-h-full text-zinc-500 text-xs'>
        {languaje}
      </p>
    </div>
  </main>
}