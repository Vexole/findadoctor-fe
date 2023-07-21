import { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from '@chakra-ui/react';

type PropTypes = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => void;
};

const CommentModal = ({ isOpen, onClose, onSubmit }: PropTypes) => {
    const [comment, setComment] = useState('');

    const handleOnSubmit = () => {
        onSubmit(comment);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comment</ModalHeader>
                <ModalBody>
                    <label>Description:</label>
                    <Input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleOnSubmit}>
                        Submit
                    </Button>
                    <Button colorScheme="green" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CommentModal;
