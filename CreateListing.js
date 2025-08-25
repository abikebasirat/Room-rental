const handleUploadPhotos = async (e) => {
    const files = Array.from(e.target.files);
  
    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `listings/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          reject,
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });
  
    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setPhotos((prev) => [...prev, ...downloadURLs]); // save image URLs
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  