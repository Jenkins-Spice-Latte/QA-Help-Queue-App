
import jenkins.model.*
import hudson.model.*
import com.cloudbees.hudson.plugins.folder.*
import jenkins.branch.*
import org.jenkinsci.plugins.workflow.job.*
import org.jenkinsci.plugins.workflow.multibranch.*

/**
 * Utility function used to delete old builds.
 *
 * @param item the current Jenkins item to process, this can be a Folder or a Project
 * @param numberOfBuildsToKeep the total number of builds to keep. Please note that one more build could be
 *        kept if the first "numberOfBuildsToKeep" builds are all in a failed state.
 */

def deleteOldBuilds(item, Integer numberOfBuildsToKeep, Integer numberOfSuccessfulBuildsKept) {
    def count = 1

    println('Checking for Old Builds...')

    for (build in item.getBuilds()) {
        if(count++ >= numberOfBuildsToKeep) {
            if(item.getBuildStatusIconClassName() == 'icon-blue' && numberOfSuccessfulBuildsKept == 0) {
                println('Keep ' + build)
            } else {
                println('Deleting ' + build)
                build.delete()
            }
        } else if(item.getBuildStatusIconClassName() == 'icon-blue') {
            numberOfSuccessfulBuildsKept++
        }
    }
    println('PRIOR BUILD COUNT: (' + count + ')')
    println ''
}

def listJobObjects(item, Integer numberOfBuildsToKeep, Integer numberOfSuccessfulBuildsKept) {
    if(item instanceof Project) {
        println('PROJECT: (' + item.getName() + ')')
        deleteOldBuilds(item, numberOfBuildsToKeep, numberOfSuccessfulBuildsKept)
    } else if(item instanceof Folder) {
        println ''
        println('FOLDER: (' + item.getName() + ')')
        println('*************************************')
        for (subItem in item.items) {
            listJobObjects(subItem, numberOfBuildsToKeep, numberOfSuccessfulBuildsKept)
        }
    } else if(item instanceof WorkflowMultiBranchProject) {
        println('MULTIBRANCH-PROJECT: (' + item.getName() + ')')
        for (subItem in item.items) {
            listJobObjects(subItem, numberOfBuildsToKeep, numberOfSuccessfulBuildsKept)
        }
    }  else if(item instanceof WorkflowJob) {
        println('MULTIBRANCH-JOB: (' + item.getName() + ')')
        deleteOldBuilds(item, numberOfBuildsToKeep, numberOfSuccessfulBuildsKept)
    } else if(item instanceof OrganizationFolder) {
        println('ORG-FOLDER: (' + item.getName() + ')')
        for (subItem in item.items) {
            listJobObjects(subItem, numberOfBuildsToKeep, numberOfSuccessfulBuildsKept)
        }
    } else {
        println('UNKNOWN: (' + item.getName() + ')')
        println('CLASS: (' + item.getClass() + ')')
        println('INSPECT: (' + item.inspect() + ')')
    }
}

for (item in Jenkins.instance.items) {
    println ''
    listJobObjects(item, 10, 10)
    println('*************************************')
}