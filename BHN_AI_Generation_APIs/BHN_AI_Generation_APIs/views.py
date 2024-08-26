import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from botocore.exceptions import ClientError

from .utils import generate_image, ImageError

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

@csrf_exempt
def generate_images_view(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    model_id = 'amazon.titan-image-generator-v1'

    options = json.dumps({
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {
            "text": body['prompt']
        },
        "imageGenerationConfig": {
            "numberOfImages": 4,
            "height": 480,
            "width": 288,
            "cfgScale": 8.0,
            "seed": 0
        }
    })

    try:
        image_bytes = generate_image(model_id=model_id,
                                     body=options)

    except ClientError as err:
        message = err.response["Error"]["Message"]
        logger.error("A client error occurred: %s", message)
        print("A client error occured: " +
              format(message))
    except ImageError as err:
        logger.error(err.message)
        print(err.message)
    else:
        print(
            f"Finished generating image with Amazon Titan Image Generator G1 model {model_id}.")

    return JsonResponse({'base64': image_bytes})
