export const optimizeCloudinary = (url: string, width = 500) => {
  return url.replace(
    "/upload/",
    `/upload/w_${width},q_auto,f_auto/`
  );
};

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
    console.log(dataImages);

    
        return dataImages.map((img:any) => ({
    original: img.secure_url,
    card: optimizeCloudinary(img.secure_url, 400),
    preview: optimizeCloudinary(img.secure_url, 200),
    full: optimizeCloudinary(img.secure_url, 800),
  }));
}