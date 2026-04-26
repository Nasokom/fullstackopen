import React from 'react'
import { useQuery } from '@apollo/client/react'
import {ALL_BOOKS} from "../queries"

const Recommend = ({me}) => {
    const genre = me.favoriteGenre
    const {data,loading,error} = useQuery(ALL_BOOKS,{variables:{genre}})

  return (
    <div>Recommend


        {loading && <>...loading </>}
        {error && <>error </>}
        {data && <> {JSON.stringify(data)} </>}


    </div>

    
  )
}

export default Recommend