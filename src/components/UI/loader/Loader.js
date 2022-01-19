import cls from './Loader.module.css'

export default function Loader() {
    return (
        <div className = { cls.container }>
            <div className = { cls.loader }>
                {/* <span>Loading...</span> */}
            </div>
        </div>
    )
}
