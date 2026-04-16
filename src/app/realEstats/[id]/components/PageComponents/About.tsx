import Head from '../Head'

function About({par}:{par:string | any}) {
  return (
    <>
                                                <Head  text={"Description"} />
                                                    

<p className='my-5'>
{par}

</p>

                                                                                            

                                                </>      
                                                       )
}

export default About