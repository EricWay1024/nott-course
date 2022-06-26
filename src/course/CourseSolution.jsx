import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getLocalStorage, setLocalStorage, processStr } from '../utils/helper';
import RenderHtml from '../components/RenderHtml';
import Table from '../components/Table';
import './course.css';

export default function CourseSolution() {
  const selectedYear = getLocalStorage('selectedYear', null);
  const planSettings = getLocalStorage('planSettings', null);

  const [creditSum, setCreditSum] = useState(planSettings.creditSum || 120);
  const [semesterLow, setSemesterLow] = useState(planSettings.semesterLow || 50);
  const [semesterHigh, setSemesterHigh] = useState(planSettings.semesterHigh || 70);
  const [groupLow, setGroupLow] = useState(planSettings.groupLow || {});
  const [groupHigh, setGroupHigh] = useState(planSettings.groupHigh || {});

  const { groups } = planSettings;

  const handleSave = () => {
    setLocalStorage('planSettings', {
      creditSum,
      semesterLow,
      semesterHigh,
      groupLow,
      groupHigh,
      groups,
      selectedYear,
    });
  };

  return (
    <Box sx={{
      width: '90%',
      margin: '0 auto',
      marginBottom: '50px',
    }}
    >
      {selectedYear ? (
        <div>
          <h1>
            {selectedYear.planTitle}
            ,
            {' '}
            {selectedYear.yearTitle}
          </h1>
          <Box>
            <h2>Total</h2>
            <TextField
              label="Credit Sum"
              variant="outlined"
              type="number"
              value={creditSum}
              onChange={(e) => setCreditSum(e.target.value)}
              className="settings-input"
            />
            <h2>Semester</h2>
            <TextField
              label="Semester Low"
              variant="outlined"
              type="number"
              value={semesterLow}
              onChange={(e) => setSemesterLow(e.target.value)}
              className="settings-input"
            />
            <TextField
              label="Semester High"
              variant="outlined"
              type="number"
              value={semesterHigh}
              onChange={(e) => setSemesterHigh(e.target.value)}
              className="settings-input"
            />

            {groups.map((group, groupIndex) => (
              <Box key={group.title}>
                <h2>{processStr(group.title)}</h2>
                <TextField
                  label="Group Low"
                  variant="outlined"
                  type="number"
                  value={groupLow[groupIndex]}
                  onChange={(e) => setGroupLow((prev) => ({
                    ...prev,
                    [groupIndex]: 1 * e.target.value,
                  }))}
                  className="settings-input"
                />
                <TextField
                  label="Group High"
                  variant="outlined"
                  type="number"
                  value={groupHigh[groupIndex]}
                  onChange={(e) => setGroupHigh((prev) => ({
                    ...prev,
                    [groupIndex]: 1 * e.target.value,
                  }))}
                  className="settings-input"
                />
                <Box className="group-detail-ctn">
                  <RenderHtml html={group.message} />
                  <Table
                    data={group.modules}
                    links={{ code: 'module' }}
                    orderedKeys={[
                      'code',
                      'title',
                      'credits',
                      'compensatable',
                      'taught',
                    ]}
                    keyType={{ credits: 'number' }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Grid item xs={10}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ width: '100%', margin: '30px 0' }}
            >
              Save
            </Button>
          </Grid>

        </div>
      ) : (
        <Box>Please select a plan.</Box>
      )}
    </Box>
  );
}
