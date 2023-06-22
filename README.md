# Truffle Health User Interface

## Project Overview  


This is a comprehensive web application developed for Truffle Health. Truffle Health's platform goes beyond simplifying medical billing processes by incorporating intelligent algorithms to help users identify errors and discrepancies in their medical bills. Built with Django as the backend framework and React as the frontend framework, this app offers a seamless user experience for managing medical bills. Users can register and login, upload itemized bill and Explanation of Benefits (EOB) images, view an overview of their bills, and update their personal details easily. The Truffle Health App showcases my skills in full-stack development and demonstrates my ability to create a functional and user-friendly healthcare management system. 

## Deployment Link
The front end and server have been deployed together using Render and are available [here.](https://medical-bills.onrender.com/) The PostgreSQL database is hosted separately.
 
![Preview Image](ReadMe-images/Preview.jpg)


## Bugs

* One issue occurs when uploading a bill, where accessing the bill overview page and then attempting to edit the bill can result in the images being mixed up or even deleted. This issue needs to be resolved to ensure a seamless experience for users and maintain the integrity of the uploaded bill data

## Future Improvements

* Expanding the file upload capabilities to support a wider range of file formats beyond JPG and PNG, such as PDFs or documents, thereby accommodating different bill formats 
* Adding a customizable field where users can input their own name or description for each bill to personalize their bill entries, such as labeling them as "Yearly Physical," "Specialist Consultation"
* A status feature for each bill, allowing the team at Truffle Health to assign statuses such as "Under Review," "Under Appeal," or "Due Date Extended" as they process the bills to provide users with visibility into the progress
* Improved form validation for required fields such as Date of Birth, address, and itemized bill image

