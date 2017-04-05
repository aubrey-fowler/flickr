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
    return response.json();
}

export function getPhotoList(data) {
    let idList = [];

    for (var i = 0; i < data.photos.photo.length; i++) {
        idList.push(data.photos.photo[i]);
    }

    return idList;
}

export function getPhotoResults(data) {
    const result = {
        page: data.photos.page,
        total: parseInt(data.photos.total, 10),
        hasNextPage: data.photos.page !== data.photos.pages,
        photoList: getPhotoList(data) 
    };
    
    return result;
}