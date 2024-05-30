import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPages, setActivePage } from '../stores/paginationSlice'

function Pagination(props) {

    let { onPageChange } = props

    const total_pages = 500
    const maxVisiblePageCount = 10

    // const [pages, setpages] = useState([])
    // const [activePage, setActivePage] = useState(1)
    const {pages, activePage} = useSelector((state) =>  state.pagination)

    const dispatch = useDispatch()

    const handlePage = (e) => {
        let selectedPageNo = 0

        if (e.target.dataset.id === "prev") {
            if (activePage > 1)
                selectedPageNo = activePage - 1
        }
        else if (e.target.dataset.id === "next") {
            selectedPageNo = activePage + 1
        }
        else {
            selectedPageNo = Number(e.target.dataset.id)
        }

        dispatch(setActivePage(selectedPageNo))
        onPageChange(selectedPageNo)

    }

    const getPages = (totalPages, maxVisiblePageCount, activePage) => {

        const maxResultSize = totalPages > maxVisiblePageCount ? maxVisiblePageCount : totalPages
        const startingPage = activePage + maxResultSize > totalPages ? totalPages - maxResultSize + 1 : activePage
        return [...Array(maxResultSize)].map((num, idx) => {
            return startingPage + idx
        });
    }

    useEffect(() => {

        const newPages = getPages(total_pages, maxVisiblePageCount, activePage)
        dispatch(setPages(newPages))

    }, [activePage])


    return (
        <div className='flex justify-center text-slate-50 my-4'>
            <button onClick={handlePage} disabled={activePage === 1} data-id={"prev"} className={` ${activePage === 1 ? "bg-zinc-900" : ""} border-2 p-2 rounded-l-xl border-sky-600`}>
                Prev
            </button>

            {pages.map((page, idx) => {
                return <div key={idx} data-id={page} onClick={handlePage} className={` ${activePage == page ? "bg-sky-600" : ""} border-t-2 border-b-2 border-r-2 border-sky-600 p-2`}>
                    {page}
                </div>

            })}

            <button onClick={handlePage} disabled={activePage === total_pages} data-id={"next"} className={` ${activePage === total_pages ? "bg-zinc-900" : ""} border-t-2 border-b-2 border-r-2 p-2 rounded-r-xl border-sky-600`}>
                Next
            </button>
        </div>
    )
}

export default Pagination