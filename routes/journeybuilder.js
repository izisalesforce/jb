router.post('/execute', async (req, res) => {
    console.log('Execute activity:', JSON.stringify(req.body, null, 2));

    const DUPLICATED_EMAILS = {
        emails: ['isandrearamirez@salesforce.com', 'test@example.com'] // Example emails
    };

    try {
        const inArguments = req.body.inArguments || [];
        let emailAddress;

        if (inArguments.length > 0 && inArguments[0].emailAddress) {
            emailAddress = inArguments[0].emailAddress;
        }

        if (!emailAddress) {
            console.error('Missing emailAddress in the payload.');
            return res.status(400).json({ error: 'Missing emailAddress' });
        }

        // Check if the email exists in the dummy object
        const isDuplicated = DUPLICATED_EMAILS.emails.includes(emailAddress);

        console.log('Is email duplicated:', isDuplicated);

        if (isDuplicated) {
            res.status(200).json({ branchResult: 'excluded_contact' });
        } else {
            res.status(200).json({ branchResult: 'accepted_contact' });
        }

    } catch (error) {
        console.error('Error executing custom activity:', error);
        res.status(500).json({ error: 'Failed to execute custom activity' });
    }
});