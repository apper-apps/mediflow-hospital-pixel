class BedService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'bed_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "ward_name_c" } },
          { field: { Name: "bed_number_c" } },
          { field: { Name: "is_occupied_c" } },
          { field: { Name: "patient_id_c" } },
          { field: { Name: "admitted_date_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "ward_name_c",
            sorttype: "ASC"
          },
          {
            fieldName: "bed_number_c", 
            sorttype: "ASC"
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
        console.error("Error fetching beds:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching beds:", error);
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
          { field: { Name: "ward_name_c" } },
          { field: { Name: "bed_number_c" } },
          { field: { Name: "is_occupied_c" } },
          { field: { Name: "patient_id_c" } },
          { field: { Name: "admitted_date_c" } }
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
        console.error(`Error fetching bed with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching bed with ID ${id}:`, error);
        throw error;
      }
    }
  }

  async create(bedData) {
    try {
      const params = {
        records: [
          {
            Name: bedData.Name || `Bed ${bedData.bed_number_c || bedData.bedNumber}`,
            ward_name_c: bedData.ward_name_c || bedData.wardName,
            bed_number_c: bedData.bed_number_c || bedData.bedNumber,
            is_occupied_c: bedData.is_occupied_c || bedData.isOccupied || false,
            patient_id_c: bedData.patient_id_c || bedData.patientId || null,
            admitted_date_c: bedData.admitted_date_c || bedData.admittedDate || null
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
          console.error(`Failed to create bed ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating bed:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating bed:", error);
        throw error;
      }
    }
  }

  async update(id, bedData) {
    try {
      const params = {
        records: [
          {
            Id: id,
            Name: bedData.Name || `Bed ${bedData.bed_number_c || bedData.bedNumber}`,
            ward_name_c: bedData.ward_name_c || bedData.wardName,
            bed_number_c: bedData.bed_number_c || bedData.bedNumber,
            is_occupied_c: bedData.is_occupied_c !== undefined ? bedData.is_occupied_c : bedData.isOccupied,
            patient_id_c: bedData.patient_id_c !== undefined ? bedData.patient_id_c : bedData.patientId,
            admitted_date_c: bedData.admitted_date_c !== undefined ? bedData.admitted_date_c : bedData.admittedDate
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
          console.error(`Failed to update bed ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating bed:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating bed:", error);
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
          console.error(`Failed to delete bed ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return response.results.every(result => result.success);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting bed:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting bed:", error);
        throw error;
      }
    }
  }
}

export default new BedService();