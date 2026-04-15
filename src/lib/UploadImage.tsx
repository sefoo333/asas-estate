export const GiveMeImage = async (event:any) => {
        const file = event.target.files;
        if (!file) return;
    let dataImages:any = [];
       for (let i = 0; i < file.length; i++){
         const formData:any = new FormData();
        formData.append("file", file[i]);
        formData.append("upload_preset", "smesme");
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dj2rasyos/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        dataImages = [...dataImages,data]
      }
    
        return dataImages
}