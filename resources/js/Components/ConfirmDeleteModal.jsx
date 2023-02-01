import React, {useState} from "react";
import {Button, Modal} from "flowbite-react";

export default function ConfirmDeleteModal({value, destroy_route}) {

    const [showModal, setShowModal] = useState(false);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(destroy_route, requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <Modal show={showModal} size="md">
            <Modal.Body>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this {value}?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={deleteItem}>
                            Yes, I'm sure
                        </Button>
                        <Button onClick={() => setShowModal(false)} color="gray">
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )

}
