async function getImgAPIStableDiffusion(container) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer key-4jo7eo4RNYkZPW9FuFriDjGRXVsn0dlLBmDN5g9qmDsmy6hBtgAywUGRSlWfRnkHQZApnkbBpBfggk1kauijKlGagpeF3cQ7`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "stable-diffusion-v1-5",
            "prompt": "Astronuts in moon",
            "n": 1,
            "width": "256",
            "height": "256",
            "steps": 25,
            "guidance": 7.5,
            "response_format": "url"
        })
    }

    try {
        const response = await fetch("https://api.getimg.ai/v1/stable-diffusion/text-to-image", options);
        console.log(response);
        container.innerHTML = response;
    } catch (error) {
        console.error(error);
    }
}
// url: https://api-images-getimg.b74c4cef8e39fc0d1de2c7604852a487.r2.cloudflarestorage.com/org-qQydiLzCiRfyia3Sk6rOW/key-tW60UfsPBfBCKnfPdxK9S/req-RE5lA45RKkS3fzEp6WOba.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cc8699d8ce09388bb5461b1e1bf500e8%2F20240823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240823T094638Z&X-Amz-Expires=3600&X-Amz-Signature=db2acd25b2065264511d817618686ca8403fe799888f1c488a889119959aad85&X-Amz-SignedHeaders=host


async function getImgAPIEssential(container) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer key-4jo7eo4RNYkZPW9FuFriDjGRXVsn0dlLBmDN5g9qmDsmy6hBtgAywUGRSlWfRnkHQZApnkbBpBfggk1kauijKlGagpeF3cQ7`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "style": "photorealism",
            "prompt": "Blue cat crying in rain",
            "output_format": "jpeg",
            "response_format": "url",
            "aspect_ratio": "1:1"
        })
    }

    try {
        const response = await fetch("https://api.getimg.ai/v1/essential-v2/text-to-image", options);
        console.log(response);
        container.innerHTML = response;
    } catch (error) {
        console.error(error);
    }
}

async function limeWireAI(container) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer lmwr_sk_s8JgGJ8Gyx_CnCu6siCBrWzywVWjE4C26jYE0XV0UbcpulKJ`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Api-Version': 'v1'
        },
        body: JSON.stringify({
            "style": "PHOTOREALISTIC",
            "prompt": "Blue cat standing in rain",
            "response_format": "url",
            "aspect_ratio": "1:1",
            samples: 4
        })
    }

    try {
        const response = await fetch("https://api.limewire.com/api/image/generation", options);
        console.log(response);
        container.innerHTML = response;
    } catch (error) {
        console.error(error);
    }
}

async function limeWireAI(container) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer lmwr_sk_s8JgGJ8Gyx_CnCu6siCBrWzywVWjE4C26jYE0XV0UbcpulKJ`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Api-Version': 'v1'
        },
        body: JSON.stringify({
            "style": "PHOTOREALISTIC",
            "prompt": "Blue cat standing in rain",
            "response_format": "url",
            "aspect_ratio": "1:1",
            samples: 4
        })
    }

    try {
        const response = await fetch("https://api.limewire.com/api/image/generation", options);
        console.log(response);
        container.innerHTML = response;
    } catch (error) {
        console.error(error);
    }
}

async function AWSTitan(container) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "prompt": "Proud of you. Have fun at school"
        })
    }

    try {
        const response = await fetch("http://127.0.0.1:8003/generate-images", options);
        console.log(response);
        container.innerHTML = response;
    } catch (error) {
        console.error(error);
    }
}

{/* <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==" */}



window.onload = function () {
    const container = document.querySelector("#container");

    AWSTitan(container);
};

