// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// export default function Modals() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Update
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <form class="w-full max-w-sm">
//         <div class="mb-3">
//         <label for="exampleFormControlInput1" class="form-label">Email address</label>
//         <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
//         </div>
//         <div class="mb-3">
//         <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
//         <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//         </div>
//     </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary">Understood</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
