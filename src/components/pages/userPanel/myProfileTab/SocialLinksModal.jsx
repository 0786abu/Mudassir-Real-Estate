import { AgentUpdateSocialMedia } from "@/redux-toolkit/action/authAction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const SocialLinksModal = ({toggle,modal,socialMedia,socialloading}) => {
    const [socialData, setSocialData] = useState();
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(AgentUpdateSocialMedia(socialData,toggle))
    }
    useEffect(()=>{
        if(socialMedia){
            setSocialData(socialMedia)
        }
    },[socialMedia])
  return (
    <div>

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Social Media Links</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label for="facebook">Facebook</Label>
              <Input id="facebook" name="facebook" value={socialData?.facebook} onChange={(e)=>setSocialData({...socialData, facebook:e.target.value})} placeholder="Enter Facebook URL" />
            </FormGroup>

            <FormGroup>
              <Label for="instagram">Instagram</Label>
              <Input id="instagram" name="instagram" value={socialData?.instagram} onChange={(e)=>setSocialData({...socialData, instagram:e.target.value})} placeholder="Enter Instagram URL" />
            </FormGroup>

            <FormGroup>
              <Label for="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" value={socialData?.linkedin} onChange={(e)=>setSocialData({...socialData, linkedin:e.target.value})} placeholder="Enter LinkedIn URL" />
            </FormGroup>

            <FormGroup>
              <Label for="youtube">YouTube</Label>
              <Input id="youtube" name="youtube" value={socialData?.youtube} onChange={(e)=>setSocialData({...socialData, youtube:e.target.value})} placeholder="Enter YouTube URL" />
            </FormGroup>

            <FormGroup>
              <Label for="website">Website</Label>
              <Input id="website" name="website" value={socialData?.website} onChange={(e)=>setSocialData({...socialData, website:e.target.value})} placeholder="Enter Webite URL" />
            </FormGroup>
        <ModalFooter>
          <Button type="submit" disabled={socialloading} color="success">{socialloading ? "Loading..." : "Save"}</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
          </Form>
        </ModalBody>

      </Modal>
    </div>
  );
};

export default SocialLinksModal;
