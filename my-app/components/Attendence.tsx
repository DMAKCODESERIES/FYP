// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useCall } from '@stream-io/video-react-sdk';
// import { useUser } from '@clerk/nextjs'; // Assuming Clerk is used for authentication
// import { Button } from './ui/button';
// import MeetingRoom2 from './MeetingRoom2';

// interface Participant {
//   id: string;
//   name: string;
//   email: string;
//   joinedAt: Date;
//   leftAt?: Date;
// }

// const MeetingRoom1: React.FC = () => {
//   const [attendance, setAttendance] = useState<Participant[]>([]);
//   const call = useCall();
//   const { user, isLoaded } = useUser(); // Adding isLoaded to ensure user data is loaded
//   const [isCreator, setIsCreator] = useState(false);

//   useEffect(() => {
//     if (!call || !isLoaded) return;

//     // Debugging logs
//     console.log('User:', user);
//     console.log('Call:', call);

//     // Ensure call and user data are available and check creator status
//     if (user && call.creatorId) {
//       const creatorCheck = call.creatorId === user.id;
//       console.log('Is Creator:', creatorCheck); // Debug log
//       setIsCreator(creatorCheck);
//     }

//     // Listen for when a participant joins
//     const handleParticipantJoined = (participant) => {
//       setAttendance((prev) => [
//         ...prev,
//         {
//           id: participant.id,
//           name: participant.user.name || 'Unknown',
//           email: participant.user.email || 'Unknown',
//           joinedAt: new Date(),
//         },
//       ]);
//     };

//     // Listen for when a participant leaves
//     const handleParticipantLeft = (participant) => {
//       setAttendance((prev) =>
//         prev.map((p) =>
//           p.id === participant.id ? { ...p, leftAt: new Date() } : p
//         )
//       );
//     };

//     call.on('participant-joined', handleParticipantJoined);
//     call.on('participant-left', handleParticipantLeft);

//     // Cleanup listeners when component unmounts
//     return () => {
//       call.off('participant-joined', handleParticipantJoined);
//       call.off('participant-left', handleParticipantLeft);
//     };
//   }, [call, user, isLoaded]);

//   // Function to download attendance as a CSV
//   const downloadAttendance = () => {
//     const csvContent = [
//       ['Name', 'Email', 'Joined At', 'Left At'],
//       ...attendance.map((participant) => [
//         participant.name,
//         participant.email,
//         participant.joinedAt.toLocaleString(),
//         participant.leftAt ? participant.leftAt.toLocaleString() : 'Still in meeting',
//       ]),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'attendance.csv';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-full relative">
//       <h1 className="text-3xl font-bold text-white mb-4">Meeting Room</h1>
//       <MeetingRoom2 />

//       {/* Show button only if the user is the creator */}
//       {isCreator && (
//         <Button
//           className="absolute top-4 right-4 bg-blue-500 rounded-md px-4 py-2.5 text-white"
//           onClick={downloadAttendance}
//         >
//           Download Attendance
//         </Button>
//       )}
//     </div>
//   );
// };

// export default MeetingRoom1;
