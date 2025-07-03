package com.anndaan.backend.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class NGOProfileRequest {
    @NotBlank
    @Size(max = 100)
    private String organizationName;

    @NotBlank
    @Size(max = 500)
    private String description;

    @NotBlank
    private String registrationNumber;

    @NotBlank
    private String address;

    @NotBlank
    private String contactNumber;

    private String website;

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
