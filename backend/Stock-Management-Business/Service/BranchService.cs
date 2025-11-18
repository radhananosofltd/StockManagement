using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;


namespace Stock_Management_Business.Service
{
    public class BranchService : IBranchService
    {
        private readonly IBranchRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<BranchService> _logger;

        public BranchService(IBranchRepository repo, IMapper mapper, ILogger<BranchService> logger)
        {
            _repo = repo;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<long> AddBranch(CreateBranchDTO branch)
        {
            _logger.LogInformation("Add Branch Service start");
           // Check if branch code already exists
           var exists = await _repo.BranchCodeExists(branch.BranchCode);
            if (exists)
            {
                _logger.LogInformation($"Branch with code '{branch.BranchCode}' already exists.");
                throw new InvalidOperationException($"Branch with code '{branch.BranchCode}' already exists.");
            }

            var branchEntity = _mapper.Map<BranchEntity>(branch);
            branchEntity.CreatedBy = branch.UserId;
            branchEntity.CreatedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            branchEntity.ModifiedBy = branch.UserId;
            branchEntity.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            branchEntity.IsActive = branch.IsActive;

            var result = await _repo.AddBranch(branchEntity);
            _logger.LogInformation("Add Branch Service end");
            return result;
        }

        public async Task<List<BranchListDTO>> GetAllBranches()
        {
            var branches = await _repo.GetAllBranches();
            return _mapper.Map<List<BranchListDTO>>(branches);
        }

        public async Task<BranchDTO?> GetBranchById(int id)
        {
            var branch = await _repo.GetBranchById(id);
            return branch != null ? _mapper.Map<BranchDTO>(branch) : null;
        }

        public async Task<bool> UpdateBranch(int id, CreateBranchDTO branch)
        {
            var existingBranch = await _repo.GetBranchById(id);
            if (existingBranch == null)
            {
                throw new InvalidOperationException($"Branch with ID '{id}' not found.");
            }

            // Check if branch code already exists for a different branch
            var codeExists = await _repo.BranchCodeExists(branch.BranchCode);
            if (codeExists && existingBranch.BranchCode != branch.BranchCode)
            {
                throw new InvalidOperationException($"Branch with code '{branch.BranchCode}' already exists.");
            }

            // Update properties
            _mapper.Map(branch, existingBranch);
            existingBranch.ModifiedBy = branch.UserId;
            existingBranch.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            if (existingBranch.ModifiedDate.Kind != DateTimeKind.Utc)
                existingBranch.ModifiedDate = DateTime.SpecifyKind(existingBranch.ModifiedDate, DateTimeKind.Utc);

            return await _repo.UpdateBranch(existingBranch);
        }

        public async Task<bool> DeleteBranch(int id, int userId)
        {
            var existingBranch = await _repo.GetBranchById(id);
            if (existingBranch == null)
            {
                throw new InvalidOperationException($"Branch with ID '{id}' not found.");
            }

            return await _repo.DeleteBranch(id, userId);
        }

        public async Task<BulkImportBranchResultDTO> BulkImportBranches(List<CreateBranchDTO> branches)
        {
            var result = new BulkImportBranchResultDTO
            {
                TotalRecords = branches.Count,
                Errors = new List<string>()
            };

            var successCount = 0;
            var failedCount = 0;

            foreach (var branch in branches)
            {
                try
                {
                    // Check if branch code already exists
                    var exists = await _repo.BranchCodeExists(branch.BranchCode);
                    if (exists)
                    {
                        result.Errors.Add($"Branch with code '{branch.BranchCode}' already exists.");
                        failedCount++;
                        continue;
                    }

                    var branchEntity = _mapper.Map<BranchEntity>(branch);
                    branchEntity.CreatedBy = branch.UserId;
                    branchEntity.CreatedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                    branchEntity.ModifiedBy = branch.UserId;
                    branchEntity.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                    branchEntity.IsActive = branch.IsActive;

                    await _repo.AddBranch(branchEntity);
                    successCount++;
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to import branch '{branch.BranchCode}': {ex.Message}");
                    failedCount++;
                }
            }

            result.SuccessfulRecords = successCount;
            result.FailedRecords = failedCount;
            result.Success = failedCount == 0;
            result.Message = result.Success 
                ? $"Successfully imported all {successCount} branches." 
                : $"Imported {successCount} branches with {failedCount} failures.";

            return result;
        }

        public async Task<List<BranchListDTO>> GetBranchesByCountry(int countryId)
        {
            var branches = await _repo.GetBranchesByCountry(countryId);
            return _mapper.Map<List<BranchListDTO>>(branches);
        }

        public async Task<BranchEntity?> GetHeadOfficeBranchDetails(int companyId)
        {
            return await _repo.GetHeadOfficeBranchByCompany(companyId);
        }
    }
}