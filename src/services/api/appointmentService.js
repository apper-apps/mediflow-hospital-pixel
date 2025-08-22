class AppointmentService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'appointment_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "patient_id_c" } },
          { field: { Name: "doctor_id_c" } },
          { field: { Name: "department_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "time_slot_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "date_c",
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
        console.error("Error fetching appointments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching appointments:", error);
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
          { field: { Name: "patient_id_c" } },
          { field: { Name: "doctor_id_c" } },
          { field: { Name: "department_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "time_slot_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
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
        console.error(`Error fetching appointment with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching appointment with ID ${id}:`, error);
        throw error;
      }
    }
  }

  async create(appointmentData) {
    try {
      const params = {
        records: [
          {
            Name: appointmentData.Name || `Appointment - ${appointmentData.time_slot_c || appointmentData.timeSlot}`,
            patient_id_c: parseInt(appointmentData.patient_id_c || appointmentData.patientId),
            doctor_id_c: appointmentData.doctor_id_c || appointmentData.doctorId,
            department_c: appointmentData.department_c || appointmentData.department,
            date_c: appointmentData.date_c || appointmentData.date,
            time_slot_c: appointmentData.time_slot_c || appointmentData.timeSlot,
            status_c: appointmentData.status_c || appointmentData.status || 'scheduled',
            notes_c: appointmentData.notes_c || appointmentData.notes || ''
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
          console.error(`Failed to create appointment ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating appointment:", error);
        throw error;
      }
    }
  }

  async update(id, appointmentData) {
    try {
      const params = {
        records: [
          {
            Id: id,
            Name: appointmentData.Name || `Appointment - ${appointmentData.time_slot_c || appointmentData.timeSlot}`,
            patient_id_c: parseInt(appointmentData.patient_id_c || appointmentData.patientId),
            doctor_id_c: appointmentData.doctor_id_c || appointmentData.doctorId,
            department_c: appointmentData.department_c || appointmentData.department,
            date_c: appointmentData.date_c || appointmentData.date,
            time_slot_c: appointmentData.time_slot_c || appointmentData.timeSlot,
            status_c: appointmentData.status_c || appointmentData.status,
            notes_c: appointmentData.notes_c || appointmentData.notes
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
          console.error(`Failed to update appointment ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating appointment:", error);
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
          console.error(`Failed to delete appointment ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return response.results.every(result => result.success);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting appointment:", error);
        throw error;
      }
    }
  }
}

export default new AppointmentService();