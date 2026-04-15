"use client"
import React from 'react'
import SearchInput from './InputSearch/SearchInput'
import { LuFilter } from 'react-icons/lu'
import SelectTypes from './InputSearch/Selects/SelectTypes'
import SelectPrice from './InputSearch/Selects/SelectPrice'
import SelectEstat from './InputSearch/Selects/SelectEstat'
import OPtionsDrawer from './OPtionsDrawer'

function SearchBarMob({transactionType,data,setData}:any) {





  return (
    <div className="parent flex gap-4 items-center p-5">
                    <SearchInput setData={setData} finder={true} placeholder={'Search Location'} />
                                    <OPtionsDrawer isMob={true} data={data} setData={setData} />
    
    </div>
  )
}

export default SearchBarMob