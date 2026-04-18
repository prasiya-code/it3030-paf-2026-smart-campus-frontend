import React from 'react';
import TicketCreateForm from '../../components/tickets/TicketCreateForm';

const CreateTicket = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Ticket</h1>
        <p className="text-gray-600">Report a maintenance or incident issue</p>
      </div>

      <TicketCreateForm />
    </div>
  );
};

export default CreateTicket;
