class PatientService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'patient_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "age_c" } },
          { field: { Name: "gender_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "emergency_contact_c" } },
          { field: { Name: "blood_group_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "current_department_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "admission_date_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching patients:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching patients:", error);
        throw error;
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "age_c" } },
          { field: { Name: "gender_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "emergency_contact_c" } },
          { field: { Name: "blood_group_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "current_department_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "admission_date_c" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching patient with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching patient with ID ${id}:`, error);
        throw error;
      }
    }
  }

  async create(patientData) {
    try {
      const params = {
        records: [
          {
            Name: patientData.Name || patientData.name,
            age_c: parseInt(patientData.age_c || patientData.age),
            gender_c: patientData.gender_c || patientData.gender,
            phone_c: patientData.phone_c || patientData.phone,
            emergency_contact_c: patientData.emergency_contact_c || patientData.emergencyContact,
            blood_group_c: patientData.blood_group_c || patientData.bloodGroup,
            allergies_c: Array.isArray(patientData.allergies_c || patientData.allergies) 
              ? (patientData.allergies_c || patientData.allergies).join(',')
              : patientData.allergies_c || patientData.allergies,
            current_department_c: patientData.current_department_c || patientData.currentDepartment,
            status_c: patientData.status_c || patientData.status,
            admission_date_c: patientData.admission_date_c || patientData.admissionDate || new Date().toISOString()
          }
        ]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create patient ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating patient:", error);
        throw error;
      }
    }
  }

  async update(id, patientData) {
    try {
      const params = {
        records: [
          {
            Id: id,
            Name: patientData.Name || patientData.name,
            age_c: parseInt(patientData.age_c || patientData.age),
            gender_c: patientData.gender_c || patientData.gender,
            phone_c: patientData.phone_c || patientData.phone,
            emergency_contact_c: patientData.emergency_contact_c || patientData.emergencyContact,
            blood_group_c: patientData.blood_group_c || patientData.bloodGroup,
            allergies_c: Array.isArray(patientData.allergies_c || patientData.allergies)
              ? (patientData.allergies_c || patientData.allergies).join(',')
              : patientData.allergies_c || patientData.allergies,
            current_department_c: patientData.current_department_c || patientData.currentDepartment,
            status_c: patientData.status_c || patientData.status,
            admission_date_c: patientData.admission_date_c || patientData.admissionDate
          }
        ]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update patient ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating patient:", error);
        throw error;
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete patient ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return response.results.every(result => result.success);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting patient:", error);
        throw error;
      }
    }
  }
}

export default new PatientService();