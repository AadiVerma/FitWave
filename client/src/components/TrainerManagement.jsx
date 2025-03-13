import './Admin.css'
const TrainerManagement = () => {
    const dummyTrainers = [
        {
            "id": 1,
            "name": "Emily Johnson",
            "profilePic": "/Image2.png",
            "biography": "Emily is a passionate fitness coach with a background in yoga and pilates. She helps clients build flexibility and strength.",
            "certifications": ["Certified Yoga Instructor", "Pilates Trainer Certification"]
        },
        {
            "id": 2,
            "name": "Sarah Lee",
            "profilePic": "Image10.png",
            "biography": "Sarah has 5+ years of experience in strength training and rehabilitation. She focuses on improving mobility and physical performance.",
            "certifications": ["Certified Personal Trainer", "Rehabilitation Specialist"]
        },
        {
            "id": 3,
            "name": "Sophia Turner",
            "profilePic": "Image7.png",
            "biography": "Sophia specializes in high-intensity interval training (HIIT) and weight loss programs. She is dedicated to pushing her clients to reach their fitness goals.",
            "certifications": ["ACE Certified Personal Trainer", "HIIT Instructor"]
        },
        {
            "id": 4,
            "name": "John Smith",
            "profilePic": "Image3.png",
            "biography": "John is a certified fitness trainer with expertise in bodybuilding and muscle growth. He provides personalized workout plans to help clients get stronger.",
            "certifications": ["NASM Certified Personal Trainer", "Certified Strength and Conditioning Specialist"]
        },
        {
            "id": 5,
            "name": "Michael Brown",
            "profilePic": "Image4.png",
            "biography": "Michael specializes in sports performance training. With a background in athletic conditioning, he helps athletes perform at their peak.",
            "certifications": ["Certified Strength Coach", "Sports Performance Specialist"]
        },
        {
            "id": 6,
            "name": "David Harris",
            "profilePic": "Image5.png",
            "biography": "David is a professional trainer with a focus on functional fitness. His approach includes movements that improve strength, agility, and coordination.",
            "certifications": ["Functional Fitness Trainer", "CrossFit Level 1 Coach"]
        },
        {
            "id": 7,
            "name": "James Williams",
            "profilePic": "Image6.png",
            "biography": "James is an expert in endurance training and outdoor fitness. He works with clients who enjoy running, cycling, and outdoor activities.",
            "certifications": ["Certified Endurance Coach", "Certified Personal Trainer"]
        },
        {
            "id": 8,
            "name": "Daniel Garcia",
            "profilePic": "Image8.png",
            "biography": "Daniel has a passion for weightlifting and powerlifting. He coaches athletes looking to improve their lifting techniques and increase their maximum strength.",
            "certifications": ["National Powerlifting Association Certified Coach", "NASM Certified Personal Trainer"]
        },
        {
            "id": 9,
            "name": "Chris Martinez",
            "profilePic": "Image9.png",
            "biography": "Chris has been training for over 8 years, specializing in martial arts and self-defense. He teaches techniques for both fitness and safety.",
            "certifications": ["Certified Martial Arts Instructor", "CPR Certified"]
        }
    ];
    return (
        <div className="bg-black text-white min-h-screen p-6 custom-scrollbar1">
            <h2 className="text-2xl font-semibold mb-6 text-neutral-200 ">Trainers Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyTrainers.map((trainer) => (
                    <div key={trainer.id} className="bg-black border-4 border-neutral-800 hover:shadow-purple-500 shadow-purple-900 p-6 rounded-xl shadow-md hover:shadow-lg">
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={trainer.profilePic}
                                alt={`${trainer.name} Profile`}
                                className="w-24 h-24 rounded-full mb-4 bg-[#121212] border-2 border-neutral-700 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-neutral-200 mb-2">{trainer.name}</h3>
                            <p className="text-gray-400 mb-4">{trainer.biography}</p>

                            <h4 className="text-lg font-semibold text-neutral-200 mb-2">Certifications:</h4>
                            <ul className="list-disc text-gray-300 pl-6">
                                {trainer.certifications.map((cert, index) => (
                                    <li key={index} className='text-start'>{cert}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerManagement;
