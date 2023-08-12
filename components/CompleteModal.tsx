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
    onSubmit: (notes: string, field2: string, field3: string) => void;
};

const CompleteModal = ({ isOpen, onClose, onSubmit }: PropTypes) => {
    const [notes, setNotes] = useState('');
    const [treatment, setTreatment] = useState('');
    const [condition, setCondition] = useState('');

    const handleOnSubmit = () => {
        onSubmit(notes, treatment, condition);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Appointment Complete</ModalHeader>
                <ModalBody>
                    <label>Treatment:</label>
                    <Input
                        type="text"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                    />
                    <label>Condition:</label>
                    <Input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    />
                    <label>Notes:</label>
                    <Input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        size="lg"
                        style={{ height: '150px', resize: 'vertical' }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleOnSubmit}>
                        Submit
                    </Button>
                    <Button colorScheme="red" style={{ marginLeft: '8px' }} onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CompleteModal;
