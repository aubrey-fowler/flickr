export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function parseJSON(response) {
    console.log(' response: ', response);
    return response.json();
}

export function getPhotoList(data) {
    console.log(' data: ', data, data.photos.photo);

    let idList = [];

    for (var i = 0; i < data.photos.photo.length; i++) {
        idList.push(data.photos.photo[i]);
    }

    return idList;
}

export function getPhotoResults(data) {
    const result = {
        page: data.photos.page,
        photoList: getPhotoList(data) 
    };
    return result;
}