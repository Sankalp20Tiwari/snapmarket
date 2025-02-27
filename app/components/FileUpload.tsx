'use client'
import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function FileUpload({onSuccess } : {onSuccess : (res : IKUploadResponse) => void}) {

    const [uploading,setUploading] = useState(false)
    const [error,setError] = useState<string | null>(null)

    const onError = (err : {message:string})=> {
        setError(err.message)
        setUploading(false)
    }

    const handleSucess = (res : IKUploadResponse) => {
        setUploading(false)
        setError(null)
        onSuccess(res)
    }

    const handleStartUpload = () => {
        setUploading(true)
        setError(null)
    }
  return (
    <div className="space-y-2">
        <IKUpload
         fileName="product-image.png"
         onError={onError}
         onSuccess={handleSucess}
         onUploadStart={handleStartUpload}
         validateFile={(file :File) => {
            const validTypes = ["image/png","image/jpeg","image/jpg","image/webp"]
            if(!validTypes.includes(file.type)){
                setError("Invalid file type")
                return false
            }
            if(file.size > 5 * 1024 * 1024){
                setError("Image size should be less than 5mb")
                return false
            }
            return true
         }}
        />
        (uploading && (
         <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading...</span>
         </div>
        ))

        {error && (
            <div className="text-sm text-red-500">{error}</div>
        )}
      
    </div>
  )
}

